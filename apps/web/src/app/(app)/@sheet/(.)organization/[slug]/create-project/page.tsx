import { ProjectForm } from '@/app/(app)/organization/[slug]/create-project/project-form'
import { InterceptedSheetContent } from '@/components/intercepted-sheet-content'
import { Sheet, SheetHeader, SheetTitle } from '@/components/ui/sheet'

export default function CreateProjectSheet() {
  return (
    <Sheet defaultOpen>
      <InterceptedSheetContent>
        <SheetHeader>
          <SheetTitle>Create project</SheetTitle>
        </SheetHeader>

        <div className="h-full p-4">
          <ProjectForm />
        </div>
      </InterceptedSheetContent>
    </Sheet>
  )
}
