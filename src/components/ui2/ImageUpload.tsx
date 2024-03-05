"use client";

import { Button } from "../ui/button";
import { ImagePlus, Trash } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";

import Image from "next/image";

const ImageUpload = (p: {
    disabled?: boolean;
    onDone: (url: string) => void;
    onDelete: (url: string) => void;
    urls: string[];
}) => {
    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {p.urls.map(url => (
                    <div
                        key={url}
                        className="relative h-[200px] w-[200px] overflow-hidden rounded-md"
                    >
                        <div className="absolute right-2 top-2 z-10">
                            <Button
                                type="button"
                                onClick={() => p.onDelete(url)}
                                variant="destructive"
                            >
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                        <Image fill={true} className="object-cover" alt="" src={url} />
                    </div>
                ))}
            </div>
            <CldUploadWidget
                onUpload={(result: any) => p.onDone(result.info.secure_url)}
                uploadPreset="h1tgs2kp"
            >
                {({ open }) => (
                    <Button type="button" disabled={p.disabled} onClick={() => open()}>
                        <ImagePlus className="mr-2 h-4 w-4" />
                        Upload an Image
                    </Button>
                )}
            </CldUploadWidget>
        </div>
    );
};

export default ImageUpload;
