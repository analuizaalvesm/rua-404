using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rua404.Domain.Entities
{
    public class Order
    {
        [Key]
        public int OrderId { get; set; }  // Chave primária

        public DateTime OrderDate { get; set; }
        public int InventoryId { get; set; }  // FK para Products (ou Inventory)
        public short CustomerId { get; set; }  // FK para Customer
        public DateTime? ReturnDate { get; set; }
        public byte StaffId { get; set; }  // FK para Staff

        // Relacionamento com Customer, Staff e Products
        public Customer Customer { get; set; }
        public Staff Staff { get; set; }
        public Product Product { get; set; }
    }


}
