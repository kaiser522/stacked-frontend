import { User2 as User2Icon } from "lucide-react";
import ClientDetailView from "./ClientDetailView";

const ClientDetailPanel = ({
  selectedClient,
  handleEdit,
  handleDelete,
  onClose,
}) => {
  return (
    <div className="mt-8">
      {selectedClient ? (
        <ClientDetailView
          client={selectedClient}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onClose={onClose}
        />
      ) : (
        <div className="bg-[var(--medium-dark)] border border-dashed border-gray-700 rounded-lg p-12 text-center text-gray-500">
          <User2Icon size={32} className="mx-auto mb-2" />
          <p>Select a client to view details</p>
        </div>
      )}
    </div>
  );
};

export default ClientDetailPanel;
