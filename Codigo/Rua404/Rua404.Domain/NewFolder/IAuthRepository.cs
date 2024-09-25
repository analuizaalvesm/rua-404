using Rua404.Domain.Entities;

namespace Rua404.Domain.NewFolder
{
    public interface IAuthRepository
    {
        Task<string> Register(string email, string password, string userName, int id);
        Task<string> Login(string email, string password);
        Task<bool> UserExists(string email);
    }
}
