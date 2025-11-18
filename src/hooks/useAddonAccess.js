import { useCallback, useMemo } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useGetAllAddonsQuery } from "../store/apis/plans.api";

const slugify = (input) => {
  if (typeof input !== "string") {
    if (input === undefined || input === null) return "";
    return slugify(String(input));
  }
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const collectIdentifiers = (user) => {
  const identifiers = new Set();
  const visited = new WeakSet();

  const addString = (value) => {
    if (!value && value !== 0) return;
    const str = String(value).trim();
    if (!str) return;
    identifiers.add(str.toLowerCase());
    identifiers.add(slugify(str));
  };

  const addComposite = (category, slug) => {
    const cat = slugify(category);
    const sl = slugify(slug);
    if (cat && sl) {
      identifiers.add(`${cat}:${sl}`);
    }
  };

  const walk = (value) => {
    if (!value && value !== 0) return;
    if (Array.isArray(value)) {
      value.forEach(walk);
      return;
    }
    if (typeof value === "string" || typeof value === "number") {
      addString(value);
      return;
    }
    if (typeof value === "boolean") {
      return;
    }
    if (typeof value === "object") {
      if (visited.has(value)) return;
      visited.add(value);

      if (value === null) return;

      const candidateFields = [
        value._id,
        value.id,
        value.key,
        value.slug,
        value.addonSlug,
        value.addon_id,
        value.addonId,
        value.addon_key,
        value.addonName,
        value.addon_name,
        value.name,
        value.title,
        value.path,
      ];
      candidateFields.forEach(addString);

      const categoryValue = value.category || value.addon_category || value.type;
      const labelValue = value.slug || value.addonSlug || value.addon_name || value.name || value.title || value.key;
      if (categoryValue && labelValue) {
        addComposite(categoryValue, labelValue);
      }

      Object.entries(value).forEach(([nestedKey, nestedValue]) => {
        if (typeof nestedValue === "boolean") {
          if (nestedValue === true) {
            addString(nestedKey);
          }
          return;
        }
        addString(nestedKey);
        walk(nestedValue);
      });
    }
  };

  const candidateProperties = [
    "selectedAddOns",
    "selectedAddons",
    "activeAddOns",
    "activeAddons",
    "availableAddOns",
    "availableAddons",
    "addons",
    "addOns",
    "planAddOns",
    "plan_addons",
    "unlockedAddOns",
    "addonSlugs",
    "addonIds",
    "addon_ids",
    "productAddOns",
    "crmAddOns",
  ];

  if (user) {
    candidateProperties.forEach((prop) => {
      if (prop in user) {
        walk(user[prop]);
      }
    });

    if (user.plan && typeof user.plan === "object") {
      candidateProperties.forEach((prop) => {
        if (prop in user.plan) {
          walk(user.plan[prop]);
        }
      });
    }

    if (user.subscription && typeof user.subscription === "object") {
      candidateProperties.forEach((prop) => {
        if (prop in user.subscription) {
          walk(user.subscription[prop]);
        }
      });
    }
  }

  return identifiers;
};

const buildAddonIndex = (addonsResponse) => {
  const addons = addonsResponse?.data;
  const bySlug = new Map();
  const byId = new Map();

  if (Array.isArray(addons)) {
    addons.forEach((addon) => {
      const slug = slugify(
        addon?.slug ||
          addon?.addon_slug ||
          addon?.addon_name ||
          addon?.name ||
          addon?.title ||
          addon?.key ||
          addon?._id
      );
      const categorySlug = slugify(addon?.category || addon?.addon_category || addon?.type);
      const id = addon?._id ? String(addon._id) : undefined;

      const entry = {
        id,
        slug,
        categorySlug,
        raw: addon,
      };

      if (slug) {
        if (!bySlug.has(slug)) {
          bySlug.set(slug, []);
        }
        bySlug.get(slug).push(entry);
      }

      if (id) {
        byId.set(id, entry);
      }
    });
  }

  return { bySlug, byId };
};

const resolveAddonEntry = (index, key, category) => {
  const normalizedKey = slugify(key);
  if (!normalizedKey) return null;

  const entries = index.bySlug.get(normalizedKey) || [];
  if (!entries.length) return null;

  if (!category) {
    return entries[0];
  }

  const categorySlug = slugify(category);
  const match = entries.find((entry) => entry.categorySlug === categorySlug);
  return match || entries[0];
};

export const useAddonAccessChecker = () => {
  const { user, loading: userLoading } = useAuth();
  // console.log(useAuth());
  console.log(user, "userLoading=", userLoading);
  const { data: addonsResponse, isLoading: addonsLoading } = useGetAllAddonsQuery(undefined, {
    refetchOnMountOrArgChange: false,
  });

  const addonIndex = useMemo(() => buildAddonIndex(addonsResponse), [addonsResponse]);
  const userIdentifiers = useMemo(() => collectIdentifiers(user), [user]);

  const canAccess = useCallback(
    (addonKey, { category } = {}) => {
    if (!user) return false;
    const normalizedKey = slugify(addonKey);
    if (!normalizedKey) return false;

    if (userIdentifiers.has(normalizedKey)) {
      return true;
    }

    const categorySlug = category ? slugify(category) : undefined;
    if (categorySlug && userIdentifiers.has(`${categorySlug}:${normalizedKey}`)) {
      return true;
    }

    const entry = resolveAddonEntry(addonIndex, normalizedKey, categorySlug);
    if (!entry) return false;

    if (entry.id && userIdentifiers.has(entry.id.toLowerCase())) {
      return true;
    }

    if (entry.slug && userIdentifiers.has(entry.slug)) {
      return true;
    }

    if (entry.categorySlug) {
      const compositeKey = `${entry.categorySlug}:${entry.slug}`;
      if (userIdentifiers.has(compositeKey)) {
        return true;
      }
    }

      return false;
    },
    [user, userIdentifiers, addonIndex]
  );

  return {
    canAccess,
    loading: userLoading || addonsLoading,
    user,
  };
};

export const useAddonAccess = (addonKey, options) => {
  const { canAccess, loading, user } = useAddonAccessChecker();
  const hasAccess = useMemo(() => canAccess(addonKey, options), [addonKey, options, canAccess]);
  return { hasAccess, loading, user };
};

export { slugify };

