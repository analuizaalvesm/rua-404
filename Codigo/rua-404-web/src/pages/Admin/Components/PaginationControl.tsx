import { Button } from "@/components/ui/Button/button";

type PaginationProps = {
  startIndex: number;
  endIndex: number;
  filteredUsers: any[];
  setCurrentPage: (page: number) => void;
  currentPage: number;
  totalPages: number;
  type: string;
};

const PaginationControl = ({
  startIndex,
  endIndex,
  filteredUsers,
  setCurrentPage,
  currentPage,
  totalPages,
  type,
}: PaginationProps) => (
  <div className="flex items-center justify-between mt-4">
    <div className="text-sm text-gray-600">
      Mostrando {startIndex + 1}-{Math.min(endIndex, filteredUsers.length)} de{" "}
      {filteredUsers.length} {type}
    </div>
    <div className="flex gap-2">
      <Button
        variant="outline"
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Anterior
      </Button>
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            className="w-8 h-8 p-0"
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </Button>
        ))}
      </div>
      <Button
        variant="outline"
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Próximo
      </Button>
    </div>
  </div>
);

export default PaginationControl;
