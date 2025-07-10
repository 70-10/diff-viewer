"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ShareUrlSectionProps {
  shareUrl: string;
  onCopy: () => void;
}

export function ShareUrlSection({ shareUrl, onCopy }: ShareUrlSectionProps) {
  const [copyButtonText, setCopyButtonText] = useState<string>("Copy");

  const handleCopy = () => {
    onCopy();
    setCopyButtonText("Copied");
    setTimeout(() => {
      setCopyButtonText("Copy");
    }, 1000);
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex space-x-4">
          <input
            type="text"
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-100 focus:border-blue-100 block w-full p-2.5"
            value={shareUrl}
            readOnly
          />
          <Button onClick={handleCopy} variant="default">
            {copyButtonText}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}