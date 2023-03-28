import React, { useState, useEffect } from 'react';
import '../css/ProjectsPage.css'
import {ApiUrl} from '../configParams.js';
export default function ProjectsFeedComponent()
{

    const filterOptions = {All: 0, MyProjects: 1 }
    const [filter, setFilter] = useState(filterOptions.All);

    const [projectsInfo, setProjectsInfo] = useState([])
    const [projectFeedData, setProjectFeedData] = useState([])
    const [loaded, setLoaded] = useState(false);

    const [userProjects, setUserProjects] = useState([])
    useEffect(() => {
        fetch(ApiUrl + 'TimeReport/total-hours')
        .then(res => res.json())
        .then(data => {setProjectsInfo(data); setProjectFeedData(data)})
        .then(setLoaded(true));
        
        const s = sessionStorage.getItem('UserSecretKey')
            console.log(s);
            fetch(ApiUrl + 'user/userprojects/' + s)
            .then(res => res.json())
            .then(data => setUserProjects(data));                     
    }, [])
        
    
    
    if(!loaded) return "Loading...";     //TODO: Change to bootstrap spinning wheel                                   

    function handleFilterChange(e) {
        const value = parseInt(e.target.value);
        setFilter(value);
      
        if (value === filterOptions.All) {
          setProjectFeedData(projectsInfo);
        } else if (value === filterOptions.MyProjects) {
          const filteredData = projectsInfo.filter(
            item => userProjects.some(userProject => userProject.projectName === item.projectName)
          );
          setProjectFeedData(filteredData);
        }
      }

    return(       
         <div className="project-feed">           
            <select value={filter} onChange={handleFilterChange} className="shadow-sm rounded border">
                {Object.entries(filterOptions).map(([label, value]) => (
                    <option key={value} value={value}>
                    {label}
                    </option>
                ))}
            </select>
                    
            <div className='project-feed'>
                <div className="row align-items-start">                                    
                    {projectFeedData.map(item => 
                        <div className='col-md-4 col-sm-6'>
                            <div className='project-card  rounded shadow border'>
                                <h3>{item.projectName}</h3>
                                <p><b>Reported time this week: </b>50h</p>
                                <p><b>Reported time total: </b>{item.totalHours}h</p>                            
                            </div>
                        </div>
                    )}                                                               
                </div>
            </div>
         </div>
    )

}


