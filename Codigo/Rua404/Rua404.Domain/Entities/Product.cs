using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rua404.Domain.Entities
{
    public class Product
    {
        [Key]
        public int InventoryId { get; set; }  // Chave primária

        public string ProductName { get; set; }
        public string ProductPrice { get; set; }
        public int ProductQuantity { get; set; }
        public DateTime LastUpdated { get; set; }
        public string Url { get; set; }

        // Relacionamento com Store
        public ICollection<Store> Stores { get; set; }
    }

}
