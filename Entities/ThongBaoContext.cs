using Microsoft.EntityFrameworkCore;

namespace CanhBaoApp.Entities
{
    public class ThongBaoContext : DbContext
    {
        public ThongBaoContext(DbContextOptions<ThongBaoContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Location> Locations { get; set; }
        #region Required
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

        }
        #endregion
    }
}