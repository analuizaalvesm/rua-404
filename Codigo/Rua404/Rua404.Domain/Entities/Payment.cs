using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rua404.Domain.Entities
{
    public class Payment
    {
        [Key]
        public short PaymentId { get; set; }  // Chave primária

        public short CustomerId { get; set; }  // FK para Customer
        public byte StaffId { get; set; }  // FK para Staff
        public int RentalId { get; set; }
        public decimal Amount { get; set; }
        public DateTime PaymentDate { get; set; }
        public DateTime LastUpdate { get; set; }

        // Relacionamento com Customer e Staff
        public Customer Customer { get; set; }
        public Staff Staff { get; set; }
    }

}
