import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/RealEstate/ui/Card";
import { Button } from "../../components/RealEstate/ui/Button";
import { Badge } from "../../components/RealEstate/ui/Badge";
import {
  ArrowLeft,
  MapPin,
  Bed,
  Bath,
  Square,
  Heart,
  Share2,
  Calendar,
  Phone,
  Mail,
  Car,
  TreePine,
  Waves,
  School,
  Eye,
  Loader2,
} from "lucide-react";
import { useGetPropertyByIdQuery, useToggleSavedPropertyMutation } from "../../store/apis/properties.api";
import PropertyMap from "../../components/RealEstate/PropertyMap";

const PropertyDetails = () => {
  const { propertyId } = useParams();
  const navigate = useNavigate();

  console.log("PropertyDetails: propertyId =", propertyId); // Debug log

  const {
    data: responseData,
    isLoading,
    isError,
    error,
  } = useGetPropertyByIdQuery(propertyId);

  let property = responseData?.data || responseData;

  console.log("PropertyDetails: responseData =", responseData); // Debug log
  console.log("PropertyDetails: property =", property); // Debug log

  const [toggleSavedProperty, { isLoading: isToggling }] = useToggleSavedPropertyMutation();

  const handleToggleSaved = async () => {
    if (property?._id) {
      try {
        await toggleSavedProperty(property._id).unwrap();
      } catch (error) {
        console.error("Failed to toggle saved status:", error);
      }
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-[var(--primary-color)] mx-auto mb-4" />
          <p className="text-gray-300">Loading property details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-200">
          {error?.status === 404 ? "Property Not Found" : "Error Loading Property"}
        </h2>
        <p className="text-gray-400 mb-4">
          {error?.data?.message || "Unable to load property details"}
        </p>
        <Button onClick={() => navigate("/realestate/properties")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Properties
        </Button>
      </div>
    );
  }

  // Property not found
  if (!property) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-200">
          Property Not Found
        </h2>
        <Button onClick={() => navigate("/realestate/properties")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Properties
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => navigate("/realestate/properties")}
          className="border-none text-gray-300 ring-1 ring-[var(--primary-color)]/70 cursor-pointer hover:ring-[var(--primary-color)]"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Properties
        </Button>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="border-none text-gray-300 ring-1 ring-[var(--primary-color)]/70 cursor-pointer hover:ring-[var(--primary-color)]"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button
            variant="outline"
            onClick={handleToggleSaved}
            disabled={isToggling}
            className="border-none text-gray-300 ring-1 ring-[var(--primary-color)]/70 cursor-pointer hover:ring-[var(--primary-color)]"
          >
            {isToggling ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Heart
                className={`w-4 h-4 mr-2 ${property.saved ? "fill-red-500 text-red-500" : ""
                  }`}
              />
            )}
            {property.saved ? "Saved" : "Save"}
          </Button>
        </div>
      </div>

      {/* Property Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {property.images && property.images.length > 0 ? (
          property.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Property ${index + 1}`}
              className="w-full h-64 object-cover rounded-lg"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop";
              }}
            />
          ))
        ) : (
          <img
            src={property.image || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop"}
            alt="Property"
            className="w-full h-64 object-cover rounded-lg col-span-full"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop";
            }}
          />
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <Card className="bg-[var(--medium-dark)] border-[var(--primary-color)]/30">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold text-gray-200">
                    {formatPrice(property.price)}
                  </div>
                  <Badge
                    variant={
                      property.status === "For Sale" ? "default" : "secondary"
                    }
                  >
                    {property.status}
                  </Badge>
                </div>
                <div className="flex flex-wrap items-center gap-6 text-lg">
                  <span className="flex items-center gap-2 text-gray-300">
                    <Bed className="w-5 h-5" />
                    {property.beds} beds
                  </span>
                  <span className="flex items-center gap-2 text-gray-300">
                    <Bath className="w-5 h-5" />
                    {property.baths} baths
                  </span>
                  <span className="flex items-center gap-2 text-gray-300">
                    <Square className="w-5 h-5" />
                    {property.sqft?.toLocaleString()} sqft
                  </span>
                  {property.views && (
                    <span className="flex items-center gap-2 text-gray-300">
                      <Eye className="w-5 h-5" />
                      {property.views} views
                    </span>
                  )}
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 text-[var(--primary-color)] mt-1" />
                  <span className="text-lg text-gray-300">
                    {property.address}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          {property.description && (
            <Card className="bg-[var(--medium-dark)] border-[var(--primary-color)]/30">
              <CardHeader>
                <CardTitle className="text-gray-200">About This Home</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed">
                  {property.description}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Property Location Map */}
          {(property.coordinates?.lat || property.latitude || property.location?.latitude) && (
            <Card className="bg-[var(--medium-dark)] border-[var(--primary-color)]/30">
              <CardHeader>
                <CardTitle className="text-gray-200 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[var(--primary-color)]" />
                  Property Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PropertyMap
                  latitude={property.coordinates?.lat || property.latitude || property.location?.latitude}
                  longitude={property.coordinates?.lng || property.longitude || property.location?.longitude}
                  address={property.address}
                  propertyName={`${property.type} - ${formatPrice(property.price)}`}
                />
              </CardContent>
            </Card>
          )}

          {/* Features */}
          {property.features && property.features.length > 0 && (
            <Card className="bg-[var(--medium-dark)] border-[var(--primary-color)]/30">
              <CardHeader>
                <CardTitle className="text-gray-200">
                  Features & Amenities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {property.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-2 bg-[var(--lighter-dark)] rounded"
                    >
                      <div className="w-2 h-2 bg-[var(--primary-color)] rounded-full"></div>
                      <span className="text-sm text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Neighborhood */}
          {property.neighborhood && (
            <Card className="bg-[var(--medium-dark)] border-[var(--primary-color)]/30">
              <CardHeader>
                <CardTitle className="text-gray-200">Neighborhood</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {(property.neighborhood.walkScore || property.neighborhood.transitScore || property.neighborhood.bikeScore) && (
                  <div className="grid grid-cols-3 gap-4">
                    {property.neighborhood.walkScore && (
                      <div className="text-center">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Waves className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="font-semibold text-gray-200">
                          {property.neighborhood.walkScore}
                        </div>
                        <div className="text-sm text-gray-400">Walk Score</div>
                      </div>
                    )}
                    {property.neighborhood.transitScore && (
                      <div className="text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Car className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="font-semibold text-gray-200">
                          {property.neighborhood.transitScore}
                        </div>
                        <div className="text-sm text-gray-400">Transit Score</div>
                      </div>
                    )}
                    {property.neighborhood.bikeScore && (
                      <div className="text-center">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <TreePine className="w-6 h-6 text-orange-600" />
                        </div>
                        <div className="font-semibold text-gray-200">
                          {property.neighborhood.bikeScore}
                        </div>
                        <div className="text-sm text-gray-400">Bike Score</div>
                      </div>
                    )}
                  </div>
                )}
                {property.neighborhood.schools && property.neighborhood.schools.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-200 flex items-center gap-2">
                      <School className="w-4 h-4" />
                      Nearby Schools
                    </h4>
                    <div className="space-y-1">
                      {property.neighborhood.schools.map((school, index) => (
                        <div key={index} className="text-sm text-gray-400">
                          {school}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Agent */}
          <Card className="bg-[var(--medium-dark)] border-[var(--primary-color)]/30">
            <CardHeader>
              <CardTitle className="text-gray-200">Contact Agent</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-[var(--primary-color)] rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-white">
                    {property.agent?.name
                      ? property.agent.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                      : "NA"}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-200">
                  {property.agent?.name || "Contact Agent"}
                </h3>
                <p className="text-sm text-gray-400">
                  Licensed Real Estate Agent
                </p>
              </div>
              <div className="space-y-2">
                <Button className="w-full" variant="default">
                  <Phone className="w-4 h-4 mr-2 text-white" />
                  Call {property.agent?.phone || "(555) 000-0000"}
                </Button>
                <Button
                  className="w-full ring-1 ring-[var(--primary-color)]/70 hover:ring-[var(--primary-color)] cursor-pointer border-none"
                  variant="outline"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email Agent
                </Button>
                <Button
                  className="w-full border-none ring-1 ring-[var(--primary-color)]/70 cursor-pointer hover:ring-[var(--primary-color)]"
                  variant="outline"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Tour
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Property Details */}
          <Card className="bg-[var(--medium-dark)] border-[var(--primary-color)]/30">
            <CardHeader>
              <CardTitle className="text-gray-200">Property Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Property Type</span>
                  <span className="font-medium text-gray-200">
                    {property.type}
                  </span>
                </div>
                {property.yearBuilt && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Year Built</span>
                    <span className="font-medium text-gray-200">
                      {property.yearBuilt}
                    </span>
                  </div>
                )}
                {property.lotSize && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Lot Size</span>
                    <span className="font-medium text-gray-200">
                      {property.lotSize}
                    </span>
                  </div>
                )}
                {property.parking !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Parking</span>
                    <span className="font-medium text-gray-200">
                      {property.parking} spaces
                    </span>
                  </div>
                )}
                {property.daysOnMarket && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Days on Market</span>
                    <span className="font-medium text-gray-200">
                      {property.daysOnMarket} days
                    </span>
                  </div>
                )}
                {property.pricePerSqft && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Price per Sq Ft</span>
                    <span className="font-medium text-gray-200">
                      ${property.pricePerSqft}
                    </span>
                  </div>
                )}
                {property.createdAt && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Listed</span>
                    <span className="font-medium text-gray-200">
                      {new Date(property.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;