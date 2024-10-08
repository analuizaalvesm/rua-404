using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rua404.Domain.Entities
{
    public class Store
    {
        [Column("store_id")]
        public byte StoreId { get; set; }  // Chave primária

        public byte? ManagerStaffId { get; set; }  // Chave estrangeira para Staff
        public short AddressId { get; set; }
        public DateTime LastUpdate { get; set; }

        // Relacionamento um-para-um com Staff (Manager)
        public Staff ManagerStaff { get; set; }

        // Relacionamento com Products
        public ICollection<Product> Products { get; set; }
        public ICollection<Payment> Customers { get; set; }
    }



}
