using Rua404.Domain.Entities;

namespace Rua404.Domain.NewFolder
{
    public interface IAuthRepository
    {
        Task<Customer> Register(Customer user, string password);
        Task<string> Login(string email, string password);
        Task<bool> UserExists(string email);
    }
}
