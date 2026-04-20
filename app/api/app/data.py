PROFILE = {
    "id"        : "user-001",
    "name"      : "Fernando Cuellar",
    "role"      : "Cloud Architect",
    "location"  : "Chihuahua, MX",
    "skills"    : ["AWS", "Azure", "GCP", "Terraform", "Kubernetes", "Docker"],
}

INCIDENTS = [
    {
        "id"            : "INC-1001",
        "title"         : "HIGH API LATENCY",
        "severity"      : "High",
        "description"   : "API latency has increased significantly, affecting user experience.",
        "status"        : "Investigating",
    },

    {
        "id"            : "INC-1002",
        "title"         : "Frontend Deployment Failure",
        "severity"      : "High",
        "description"   : "Frontend deployment has failed, causing service disruption.",
        "status"        : "Mitigated",
    },

    {
        "id"            : "INC-1003",
        "title"         : "Database Connection Issues",
        "severity"      : "Low",
        "description"   : "Intermittent database connection issues observed, impacting performance.",
        "status"        : "Monitoring",
    }
]

SERVICES = [
    {
        "name"          : "Frontend",
        "status"        : "Healthy"
    },

    {
        "name":          "API",
        "status":        "Healthy"
    },

    {
        "name":          "auth",
        "status":        "Healthy"
    }
]