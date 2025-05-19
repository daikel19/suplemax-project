import { useEffect } from 'react'
import { BsChatDots } from 'react-icons/bs'

function Suplebot() {
  useEffect(() => {
    const inject = document.createElement('script')
    inject.src = 'https://cdn.botpress.cloud/webchat/v2.5/inject.js'
    inject.async = true
    document.body.appendChild(inject)

    const config = document.createElement('script')
    config.src = 'https://files.bpcontent.cloud/2025/05/12/17/20250512175626-8AO6D53Z.js'
    config.async = true
    document.body.appendChild(config)

    return () => {
      document.body.removeChild(inject)
      document.body.removeChild(config)
    }
  }, [])

  return null
}

export default Suplebot
