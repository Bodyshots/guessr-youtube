"use client";

import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useAppSelector, useAppDispatch } from '@/redux/store'
import { setPrivacyAck } from '@/redux/slices/privacySlice'
import { Button } from '../ui/button';
import PrivacyDesc from './PrivacyDesc/privacydesc';

const PrivacyPop = () => {
  const privacy_ack = useAppSelector((state) => state.privacy_persist.privacy_ack);
  const dispatch = useAppDispatch();

  const onOpenChange = () => {
    dispatch(setPrivacyAck(!privacy_ack));
  }

  return (
    <Dialog 
      open={!privacy_ack} onOpenChange={() => onOpenChange()}>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()} hideClose>
        <DialogHeader>
          <DialogTitle className="text-center font-yt_font">
            Privacy Policy
          </DialogTitle>
        </DialogHeader>
        <PrivacyDesc/>
        <DialogFooter className="flex flex-col justify-center sm:justify-center">
          <DialogTrigger asChild>
            <Button className="w-auto font-roboto">
              I agree
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default PrivacyPop