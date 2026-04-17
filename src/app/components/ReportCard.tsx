import { MapPin, Clock, Trash2 } from "lucide-react";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { motion } from "motion/react";

export interface Report {
  id: string;
  type: string;
  description: string;
  location: string;
  date: string;
  status: "pendiente" | "en-revision" | "solucionado";
  imageUrl?: string;
}

interface ReportCardProps {
  report: Report;
  onClick?: () => void;
  onDelete?: (id: string) => void;
}

export function ReportCard({ report, onClick, onDelete }: ReportCardProps) {
  const statusVariant = {
    pendiente: "warning" as const,
    "en-revision": "info" as const,
    solucionado: "success" as const,
  };

  const statusLabel = {
    pendiente: "Pendiente",
    "en-revision": "En Revisión",
    solucionado: "Solucionado",
  };

  return (
    <Card hover onClick={onClick} className="overflow-hidden relative group">
      {report.imageUrl && (
        <img
          src={report.imageUrl}
          alt={report.type}
          className="w-full h-40 object-cover rounded-t-lg -mt-4 -mx-4 mb-3"
        />
      )}
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-gray-900">{report.type}</h3>
        <Badge variant={statusVariant[report.status]}>
          {statusLabel[report.status]}
        </Badge>
      </div>
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{report.description}</p>
      <div className="flex items-center gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          <span>{report.location}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>{report.date}</span>
        </div>
      </div>

      {/* Delete Button */}
      {onDelete && (
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(report.id);
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-3 right-3 p-2 bg-red-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-200 z-10"
        >
          <Trash2 className="w-4 h-4 text-red-600" />
        </motion.button>
      )}
    </Card>
  );
}