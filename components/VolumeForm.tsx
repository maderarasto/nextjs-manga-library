import React from 'react';
import {clsx} from "clsx";

export type VolumeFormProps = {
  className?: string;
}

const VolumeForm = ({
  className,
}: VolumeFormProps) => {
  return (
    <>
      <div className={clsx('p-4 overflow-y-auto', className)}>
        <div className="flex justify-center mb-12">
          <div className="volume-card w-64 h-96"></div>
        </div>
      </div>
    </>
  );
};

export default VolumeForm;