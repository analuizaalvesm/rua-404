using System.ComponentModel.DataAnnotations;

namespace Rua404.Domain.Entities
{
    public class Staff
    {
        [Key]
        public byte StaffId { get; set; }  // Chave primária

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public short AddressId { get; set; }
        public byte StoreId { get; set; }  // FK para Store
        public string Email { get; set; }
        public byte Active { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public DateTime LastUpdate { get; set; }

        // Relacionamento com Store (uma Store pode ser gerenciada por esse Staff)
        public Store Store { get; set; }

        // Relacionamento com Orders e Payments
        public ICollection<Order> Orders { get; set; }
        public ICollection<Payment> Payments { get; set; }
    }


}
