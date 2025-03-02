"use client"

import React from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { setPrivacyAck } from '@/redux/slices/privacySlice'

const Footer = () => {
    const privacy_ack = useAppSelector((state) => state.privacy_persist.privacy_ack)
    const dispatch = useAppDispatch();

    return (
        <div className="text-center w-[100%] absolute bottom-0 p-4 text-white text-sm font-yt_font">
            <u className="hover:cursor-pointer" onClick={() => dispatch(setPrivacyAck(!privacy_ack))}>Privacy Policy</u>
        </div>
    )
}

export default Footer