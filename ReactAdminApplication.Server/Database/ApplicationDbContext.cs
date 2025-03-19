using Microsoft.EntityFrameworkCore;
using ReactAdminApplication.Server.Models;

namespace ReactAdminApplication.Server.Database
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        { }

        public DbSet<User> Users { get; set; } 
    }
}
