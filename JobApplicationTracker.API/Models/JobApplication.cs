using System.ComponentModel.DataAnnotations;

namespace JobApplicationTracker.API.Models
{
    public class JobApplication
    {
        public int JobApplicationId {  get; set; }

        [Required]
        public string companyName { get; set; } = string.Empty;

        [Required]
        public string jobTitle { get; set; } = string.Empty;

        public string? location { get; set; }

        [Required]
        public DateTime dateApplied { get; set; }

        [Required(ErrorMessage = "Status is required.")]
        [RegularExpression("^(Applied|Interviewing|Offer|Rejected)$", ErrorMessage = "Invalid status value. Allowed values are: Applied, Interviewing, Offer, or Rejected.")]
        public string status { get; set; } = string.Empty;

        public string? jobUrl { get; set; }

        public string? notes { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }


    }
}
