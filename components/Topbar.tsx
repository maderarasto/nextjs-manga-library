import React from 'react';
import {SidebarTrigger} from "@/components/ui/sidebar";
import {Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator} from "@/components/ui/breadcrumb";
import {UserButton} from "@clerk/nextjs";
import DarkModeToggle from "@/components/DarkModeToggle";
import {CollectionWithVolumes} from "@/lib/types";
import {Button} from "@/components/ui/button";

export type TopbarProps = {
  activeCollection: CollectionWithVolumes | null;
  onCollectionChanged?: (collection: CollectionWithVolumes | null) => void;
}

const Topbar = ({
  activeCollection,
  onCollectionChanged,
}: TopbarProps) => {
  const changeCollection = (collection: CollectionWithVolumes | null) => {
    if (!onCollectionChanged) {
      return;
    }

    onCollectionChanged(collection);
  }

  return (
    <nav className="flex flex-row justify-between items-center gap-2 w-full h-12 border-b px-2 pr-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="font-medium text-slate-700" onClick={() => changeCollection(null)}>
              <Button variant="link" className="px-0 cursor-pointer">Library</Button>
            </BreadcrumbItem>
            {activeCollection ? (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem className="font-medium text-slate-700" onClick={() => changeCollection(activeCollection)}>
                    <Button variant="link" className="px-0 cursor-pointer">{activeCollection.name}</Button>
                  </BreadcrumbItem>
                </>
            ) : ''}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center gap-2">
        <DarkModeToggle />
        <UserButton />
      </div>
    </nav>
  );
};

export default Topbar;