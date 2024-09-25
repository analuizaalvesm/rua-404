namespace Rua404.Domain.Entities
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class Customer
    {
        [Key]
        [Column("customer_id")]
        public short? CustomerId { get; set; }

        [Column("store_id")]
        public byte? StoreId { get; set; }

        [Column("first_name")]
        public string FirstName { get; set; }

        [Column("last_name")]
        public string LastName { get; set; }

        [Column("email")]
        public string Email { get; set; }

        [Column("address")]
        public string Address { get; set; }

        [Column("active")]
        public bool? Active { get; set; }

        [Column("create_date")]
        public DateTime? CreateDate { get; set; }

        [Column("last_update")]
        public DateTime? LastUpdate { get; set; }

        [Column("password")]
        public string Password { get; set; }

        [ForeignKey("store_id")]
        public Store? Store { get; set; }

        public ICollection<Order>? Orders { get; set; }
    }
}
