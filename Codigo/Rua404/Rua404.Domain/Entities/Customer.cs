namespace Rua404.Domain.Entities
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class Customer
    {
        [Key]
        [Column("customer_id")] 
        public short CustomerId { get; set; }

        [Column("store_id")] // Mapeando 'StoreId' para 'store_id' no banco de dados
        public byte StoreId { get; set; } // FK para Store, representa a loja à qual o cliente pertence

        [Column("first_name")] // Mapeando 'FirstName' para 'first_name' no banco de dados
        public string FirstName { get; set; } // Nome do cliente

        [Column("last_name")] // Mapeando 'LastName' para 'last_name' no banco de dados
        public string LastName { get; set; } // Sobrenome do cliente

        [Column("email")] // Mapeando 'Email' para 'email' no banco de dados
        public string Email { get; set; } // Email do cliente, usado para comunicação e autenticação

        [Column("address")] // Mapeando 'Address' para 'address' no banco de dados
        public string Address { get; set; } // Endereço do cliente para correspondência e entregas

        [Column("active")] // Mapeando 'Active' para 'active' no banco de dados
        public bool Active { get; set; } // Indica se o cliente está ativo (true) ou inativo (false)

        [Column("create_date")] // Mapeando 'CreateDate' para 'create_date' no banco de dados
        public DateTime CreateDate { get; set; } // Data de criação do registro do cliente

        [Column("last_update")] // Mapeando 'LastUpdate' para 'last_update' no banco de dados
        public DateTime LastUpdate { get; set; } // Data da última atualização do registro do cliente

        [Column("password")] // Mapeando 'Password' para 'password' no banco de dados
        public string Password { get; set; } // Senha do cliente (geralmente deve ser tratada com segurança)

        // Relacionamento com Store
        [ForeignKey("store_id")] // Mapeando o relacionamento com a tabela Store
        public Store Store { get; set; } // Navegação para a entidade Store, indicando a relação entre cliente e loja

        // Relacionamento com Orders
        public ICollection<Order> Orders { get; set; } // Coleção de pedidos associados a este cliente
    }




}