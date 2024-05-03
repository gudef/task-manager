"use client";
import { upsertUserprogress } from "@/actions/user-progress";
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react";




export const LinkToAddTask = () => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        upsertUserprogress();
    }, []);

    if (!isMounted) {
        return null;
    }

    return (

      <></>
    )
}