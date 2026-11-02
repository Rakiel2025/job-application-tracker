using JobApplicationTracker.API.Models;
using Microsoft.EntityFrameworkCore;

namespace JobApplicationTracker.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(
            DbContextOptions<ApplicationDbContext> options ) 
            : base( options )
        {

        }

        public DbSet<JobApplication> JobApplications 
            => Set<JobApplication>();
    }
}
