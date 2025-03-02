import './about.css'
import '../globals.css'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import React from 'react'

const AboutLink: React.FC<{href: string, body: string}> = ({
  href,
  body}) => (
  <Link 
  href={href}
  className="underline hover:opacity-50 transition-opacity">
  {body}
</Link>
);

const About = () => {
    return (
    <div className="w-full p-8 font-yt_font">
      <Card
          className="p-6">
          <h1 className="about_title">About this Website</h1>
          <h2 className="about_subtitle">How this site works</h2>
          <p className="font-roboto">TODO</p>
          <h1 className="about_title">Contact Info</h1>
          <p className="font-roboto pb-4">
            Original idea by <AboutLink href={"https://guessr.tv/"} body={"badoge"}/>, which was also inspired by <AboutLink href={"https://www.geoguessr.com/"} body={"GeoGuessr"}/> and <AboutLink href={"https://www.twitch.tv/nymn"} body={"NymnHS"}/>.
            <br/>
            You can shoot me an email at <AboutLink href={"mailto:lanzangeles100@gmail.com?subject=sup nerd"} body={"lanzangeles100@gmail.com"}/>. 
          </p>
      </Card>
    </div>
    )
}

export default About;