import { H1 } from "@/components/custom/headers"
import { ProjectCreateForm } from "./_components/project-create"

function ProjectCreate() {
	return (
		<div className='h-full w-full mx-auto max-w-screen-lg flex flex-col'>
			<H1>Новый проект</H1>
      <ProjectCreateForm />
		</div>
	)
}

export default ProjectCreate
