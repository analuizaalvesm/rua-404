using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Rua404.Domain.NewFolder;
using Rua404.Infraestrutura;
using Rua404.Infraestrutura.Services;
using System.Security.Cryptography;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

var key = new byte[32];
using (var randomNumberGenerator = RandomNumberGenerator.Create())
{
    randomNumberGenerator.GetBytes(key);
}

string keyBase64 = Convert.ToBase64String(key);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = "EstaEhUmaChaveSecretaLongaEAleatoriaQueTemQueTerPeloMenos32Bytes",  
        ValidAudience = "EstaEhUmaChaveSecretaLongaEAleatoriaQueTemQueTerPeloMenos32Bytes", 
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(keyBase64))
    };
});

builder.Services.AddControllers();
builder.Services.AddScoped<IAuthRepository, AuthService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<Rua404DbContext>();
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
