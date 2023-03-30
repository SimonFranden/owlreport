import ProjectsFeedComponent from "./ProjectFeedComponent"
import NewProjectFormComponent from "./NewProjectFormComponent"

export default function ProjectsPage()
{
    return(       
         <div className="container p-1">
            
            <NewProjectFormComponent/>          
            <ProjectsFeedComponent/>
         </div>
    )
}


