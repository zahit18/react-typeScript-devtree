import { useState } from "react"
import { toast } from "sonner"
import { social } from "../data/social"
import DevTreeInput from "../components/DevTreeInput"
import { isValidUrl } from "../utils"

export default function LinkTreeView() {
  const [devTreeLinks, setDevTreeLinks] = useState(social)

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedLinks = devTreeLinks.map(link => link.name === e.target.name ? {...link, url: e.target.value} : link)

    setDevTreeLinks(updatedLinks)
  }

  const handleEnabledLink = (socialNetwork: string) => {
    const updatedLinks = devTreeLinks.map(link => {
      if(link.name === socialNetwork) {
        if(isValidUrl(link.url)) {
          return {...link, enabled: !link.enabled}
        } else {
          toast.error('URL no valida')
        }
      }
      return link
    })
    console.log(updatedLinks)
    setDevTreeLinks(updatedLinks)
  }

  return (
    <>
      <div className="space-y-5">
          {devTreeLinks.map(item => (
            <DevTreeInput 
              key={item.name}
              item={item}
              handleUrlChange={handleUrlChange}
              handleEnabledLink={handleEnabledLink}
            />
          ))}
      </div>
    </>
  )
}
