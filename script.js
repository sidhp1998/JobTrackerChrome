// ADD your event listeners here
document.addEventListener("DOMContentLoaded", function() {
    const reset_button = document.getElementById("btn-reset-job");
    reset_button.addEventListener("click", resetJobAddition);

    const add_button = document.getElementById("btn-add-job");
    add_button.addEventListener("click", jobAddition);

    const refresh_button = document.getElementById("btn-refresh");
    refresh_button.addEventListener("click", refresh);
});


// List of all job statuses
let jobStatus=["Saved","Applied","Interview","Offer","Rejected","Withdrawn","Not Interested","Other"];

//Definition of Job class
class Job
{
    constructor(url,company=null,role=null,location=null,notes=null,status=null,dateAdded=null)
    {
        //this.jobId =null
        this.url = url;
        this.company = company;
        this.role = role;
        this.location = location;
        this.notes = notes;
        this.status = status;
        this.dateAdded = dateAdded;
    }
}

//let jobListUL = document.getElementById("job-list");
// Internal list of jobs
let jobList = [];

// Render the initial table
let jobListTableEl = document.getElementById("job-list-table");
const headers = ["URL", "Company", "Role", "Location", "Notes", "Status", "Date Added"];
const thead = document.createElement("thead");
const headerRow = document.createElement("tr");
for(let i = 0; i < headers.length; i++)
{
    const th = document.createElement("th");
    th.textContent = headers[i];
    headerRow.appendChild(th);
}
thead.appendChild(headerRow);
jobListTableEl.appendChild(thead);

function refresh()
{
    renderTable(jobList);
}
function resetJobAddition()
{
    document.getElementById("job-url").value = "";
    document.getElementById("job-company").value = "";
    document.getElementById("job-role").value = "";
    document.getElementById("job-location").value = "";
    document.getElementById("job-notes").value = "";
}

function jobAddition()
{
    let jobUrlEl = document.getElementById("job-url");
    if(!isTextValid(jobUrlEl.value))
    {
        alert("Please enter a valid URL");
        return;
    }
    else
    {
        let jobCompanyEl = document.getElementById("job-company");
        let jobRoleEl = document.getElementById("job-role");
        let jobLocationEl = document.getElementById("job-location");
        let jobNotesEl = document.getElementById("job-notes");
        let newJob = new Job(jobUrlEl.value,
            jobCompanyEl.value,
            jobRoleEl.value,
            jobLocationEl.value,
            jobNotesEl.value,
            jobStatus[0],
            new Date());
        jobList.push(newJob);
        //renderTable(jobList);
    }
    resetJobAddition();
}

function isTextValid(str)
{
    // This is validation checker function for URL
    if(str === "" || str === null || str === undefined || str.length < 3)
    {
        return false;
    }
    return true;
}

function renderTable(jobList)
{
    // Create table body
    const tbody = document.createElement("tbody");
    for(let i = 0; i<jobList.length;i++)
    {
        const tableRow = document.createElement("tr");
        for(let j = 0; j< properties.length; j++)
        {
            const td = document.createElement("td");
            if(properties[j]==="url")
            {
                const link = document.createElement("a");
                link.href = jobList[i][properties[j]];
                link.textContent = jobList[i][properties[j]];
                link.target = "_blank";
                td.appendChild(link);
            }
            else 
            {
                td.textContent = jobList[i][properties[j]] || ""; // Handle null values
            }
            tableRow.appendChild(td);
        }
        tbody.appendChild(tableRow);
    }
    jobListTableEl.appendChild(tbody);
}