'use client'

import React, { useState, useEffect } from 'react'
import { Moon, Sun, Laptop, ChevronRight } from 'lucide-react'

type ColorMode = 'dark' | 'light' | 'system'

type OutputLine = {
  type: 'command' | 'result',
  text: string
}

export function ModernCliTerminal() {
  const [colorMode, setColorMode] = useState<ColorMode>('system')
  const [systemPreference, setSystemPreference] = useState<'dark' | 'light'>('dark')
  const [command, setCommand] = useState('')
  const [output, setOutput] = useState<OutputLine[]>([
    { type: 'result', text: 'Bienvenido a LinuxCLI v1.0.0' },
    { type: 'result', text: 'Escribe "help" para ver la lista de comandos.' },
  ])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setSystemPreference(mediaQuery.matches ? 'dark' : 'light')

    const handler = () => setSystemPreference(mediaQuery.matches ? 'dark' : 'light')
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  const handleCommand = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const newOutput = [...output, { type: 'command' as const, text: `$ ${command}` }]

      try {
        const response = await fetch('/execute', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ command }),
        })

        const data = await response.json()

        if (response.ok) {
          if (data.output === "CLEAR_SCREEN") {
            setOutput([])
          } else {
            const resultLines = data.output.split('\n').map((line: string) => ({ type: 'result' as const, text: line }))
            setOutput([...newOutput, ...resultLines])
          }
        } else {
          setOutput([...newOutput, { type: 'result' as const, text: `Error: ${data.error}` }])
        }
      } catch (error) {
        setOutput([...newOutput, { type: 'result' as const, text: `Error: ${(error as Error).message}` }])
      }

      setCommand('')
    }
  }

  const getActiveMode = (): 'dark' | 'light' => {
    if (colorMode === 'system') return systemPreference
    return colorMode
  }

  const activeMode = getActiveMode()

  return (
    <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
      activeMode === 'dark' 
        ? 'bg-gray-900' 
        : 'bg-gray-100'
    }`}>
      <div className={`w-full max-w-4xl h-[500px] rounded-lg shadow-xl overflow-hidden transition-colors duration-300 backdrop-blur-md ${
        activeMode === 'dark' 
          ? 'bg-gray-800/90 text-white' 
          : 'bg-white/90 text-gray-800'
      }`}>
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700">
          <h1 className="text-lg font-bold font-mono">LinuxCLI</h1>
          <div className="flex space-x-2">
            <button
              onClick={() => setColorMode('dark')}
              className={`p-1 rounded-full ${colorMode === 'dark' ? 'bg-blue-500' : ''}`}
            >
              <Moon size={16} />
            </button>
            <button
              onClick={() => setColorMode('light')}
              className={`p-1 rounded-full ${colorMode === 'light' ? 'bg-yellow-500' : ''}`}
            >
              <Sun size={16} />
            </button>
            <button
              onClick={() => setColorMode('system')}
              className={`p-1 rounded-full ${colorMode === 'system' ? 'bg-green-500' : ''}`}
            >
              <Laptop size={16} />
            </button>
          </div>
        </div>
        <div className="p-4 font-mono text-sm h-[calc(100%-40px)] overflow-y-auto">
          {output.map((line, index) => (
            <div key={index} className={`mb-1 ${line.type === 'command' ? 'text-orange-500' : ''}`}>
              {line.text}
            </div>
          ))}
          <div className="flex items-center mt-2">
            <ChevronRight className="mr-2 text-green-500" size={16} />
            <input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={handleCommand}
              className={`flex-grow bg-transparent outline-none font-mono ${
                activeMode === 'dark' ? 'text-green-400' : 'text-green-600'
              }`}
              placeholder="Ingresa un comando..."
            />
          </div>
        </div>
      </div>
    </div>
  )
}