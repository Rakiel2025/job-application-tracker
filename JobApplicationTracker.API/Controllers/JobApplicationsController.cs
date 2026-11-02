using JobApplicationTracker.API.Data;
using JobApplicationTracker.API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using System.Security.Cryptography;

namespace JobApplicationTracker.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobApplicationsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        private readonly ILogger<JobApplicationsController> _logger;

        public JobApplicationsController(ILogger<JobApplicationsController> logger, ApplicationDbContext context)
        {
            _logger = logger; 
            _context = context;

            
            
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<JobApplication>>> GetAll()
        {
            try
            {
                var applications = await _context.JobApplications
                    .AsNoTracking()
                    .ToListAsync();

                return Ok(applications);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to retrieve job applications from the database.");
                return StatusCode(500, new { message = "An internal server error occurred. Please try again later." });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<JobApplication>> GetById(int id)
        {
            var application = await _context.JobApplications
                .AsNoTracking()
                .FirstOrDefaultAsync(a => a.JobApplicationId == id);

            if (application == null)
            {
                return NotFound(new { message = "Job application not found." });
            }

            return Ok(application);
        }

        [HttpPost]
        public async Task<ActionResult<JobApplication>> Create([FromBody] JobApplication application)
        {
            application.CreatedDate = DateTime.UtcNow;
            application.UpdatedDate = DateTime.UtcNow;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.JobApplications.Add(application);
            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetById),
                new
                {
                    id = application.JobApplicationId
                },
                application);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(
            int id,
            JobApplication updateApplication)
        {
            if (id != updateApplication.JobApplicationId)
            {
                return BadRequest();
            }

            var application = await _context.JobApplications
                .FindAsync(id);

            if (application == null)
            {
                return NotFound();
            }

            application.companyName = updateApplication.companyName;
            application.jobTitle = updateApplication.jobTitle;
            application.location = updateApplication.location;
            application.dateApplied = updateApplication.dateApplied;
            application.status = updateApplication.status;
            application.jobUrl = updateApplication.jobUrl;
            application.notes = updateApplication.notes;
            application.UpdatedDate = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var application = await _context.JobApplications
                .FindAsync(id);

            if (application == null)
            {
                return NotFound();
            }

            _context.JobApplications.Remove(application);
            await _context.SaveChangesAsync();

            return NoContent();
        }
            
    }
}
