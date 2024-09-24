namespace Rua404.Domain.Entities
{
    using System.ComponentModel.DataAnnotations;

    public class Customer
    {
        [Key]  // Especificando que 'CustomerId' é a chave primária
        public short CustomerId { get; set; }  // Chave primária

        public byte StoreId { get; set; }  // FK para Store
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public bool Active { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime LastUpdate { get; set; }

        // Relacionamento com Store
        public Store Store { get; set; }

        // Relacionamento com Orders
        public ICollection<Order> Orders { get; set; }
    }



}