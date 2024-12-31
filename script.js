// ADD your event listeners here
document.addEventListener("DOMContentLoaded", function() {
    const reset_button = document.getElementById("btn-reset-job");
    reset_button.addEventListener("click", resetJobAddition);

    const form = document.querySelector("form");
    form.addEventListener("submit", jobAddition);

    const toggle_button = document.getElementById("btn-toggle-jobs");
    toggle_button.addEventListener("click", toggleJobList);

    loadJobs();
});

function loadJobs() {
    const storedJobs = localStorage.getItem('jobList');
    if (storedJobs) {
        jobList = JSON.parse(storedJobs);
        //renderTable(jobList);
    }
    else{
        jobList = [];
    }
}
// List of all job statuses
let jobStatus=["Saved","Applied","Interview","Offer","Rejected","Withdrawn","Not Interested","Other"];
//List of all Job Class properties
let properties = ["url", "company", "role", "location", "notes", "status", "dateAdded"];
//Definition of Job class
class Job
{
    constructor(url,company=null,role=null,location=null,notes=null,status=null,dateAdded=null)
    {
        this.url = url;
        this.company = company;
        this.role = role;
        this.location = location;
        this.notes = notes;
        this.status = status;
        this.dateAdded = dateAdded;
    }
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
    event.preventDefault();
    console.log('inside jobAddition');
    let jobUrlEl = document.getElementById("job-url");
    console.log(jobUrlEl.value);
    if(!isTextValid(jobUrlEl.value))
    {
        alert("Please enter a valid URL");
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
        localStorage.setItem('jobList', JSON.stringify(jobList)); // Save to localStorage
    }
    resetJobAddition();
    alert("Job added!");
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
    const jobListTableEl = document.getElementById("job-list-table");
    jobListTableEl.innerHTML = "";
    // Create table header
    const headers = ["URL", "Company", "Role", "Location", "Notes", "Status", "Date Added"];
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    for (let i = 0; i < headers.length; i++) {
        const th = document.createElement("th");
        th.textContent = headers[i];
        headerRow.appendChild(th);
    }
    thead.appendChild(headerRow);
    jobListTableEl.appendChild(thead);

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
            else if (properties[j] === "status") 
            {
                const select = document.createElement("select");
                jobStatus.forEach(status => {
                    const option = document.createElement("option");
                    option.value = status;
                    option.textContent = status;
                    if (status === jobList[i][properties[j]]) {
                        option.selected = true;
                    }
                    select.appendChild(option);
                });
                select.addEventListener("change", function() {
                    updateJobStatus(i, select.value);
                });
                td.appendChild(select);
            }
            else 
            {
                td.textContent = jobList[i][properties[j]] || ""; // Handle null values
            }
            tableRow.appendChild(td);
        }
        const deleteTd = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function() {
            deleteJob(i);
        });
        deleteTd.appendChild(deleteButton);
        tableRow.appendChild(deleteTd);
        tbody.appendChild(tableRow);
    }
    let existingTbody = jobListTableEl.querySelector("tbody");
    if (existingTbody) {
      jobListTableEl.removeChild(existingTbody);
    }

    jobListTableEl.appendChild(tbody);
}

function deleteJob(index) {
    jobList.splice(index, 1); // Remove the job from the list
    localStorage.setItem('jobList', JSON.stringify(jobList)); // Update localStorage
    renderTable(jobList); // Re-render the table
}
function updateJobStatus(index, newStatus) {
    jobList[index].status = newStatus;
    localStorage.setItem('jobList', JSON.stringify(jobList)); // Update localStorage
    renderTable(jobList); // Re-render the table
}

function toggleJobList() {
    const viewJobsDiv = document.getElementById("view-jobs");
    const addJobDiv = document.getElementById("add-job");
    const toggleButton = document.getElementById("btn-toggle-jobs");
    if (viewJobsDiv.style.display === "none" || viewJobsDiv.style.display === "") {
        viewJobsDiv.style.display = "block";
        addJobDiv.style.display = "none";
        toggleButton.textContent = "Hide jobs";
        renderTable(jobList);
    } else {
        viewJobsDiv.style.display = "none";
        addJobDiv.style.display = "block";
        toggleButton.textContent = "View all jobs";
    }
}