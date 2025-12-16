import React from 'react';
import {SidebarTrigger} from "@/components/ui/sidebar";
import {Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator} from "@/components/ui/breadcrumb";
import {UserButton} from "@clerk/nextjs";
import DarkModeToggle from "@/components/DarkModeToggle";
import {Collection} from "@/generated/prisma/client";

export type TopbarProps = {
  activeCollection: Collection | null;
}

const Topbar = ({
  activeCollection,
}: TopbarProps) => {
  return (
    <nav className="flex flex-row justify-between items-center gap-2 w-full h-12 border-b px-2 pr-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="font-medium text-slate-700">
              Library
            </BreadcrumbItem>
            {activeCollection ? (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem className="font-medium text-slate-700">
                    {activeCollection.name}
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