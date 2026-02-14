"use client"

import { useState, useEffect, useRef } from "react"
import { Chatbot } from "@/components/chatbot"
import { SlingshotVolume } from "@/components/slingshot-volume"
import { RedeemCode } from "@/components/redeem-code"

export default function Page() {
  const [number, setNumber] = useState(9173210000)
  const [blurred, setBlurred] = useState(false)
  const [fixedMode, setFixedMode] = useState(false)
  const [waifuMode, setWaifuMode] = useState(false)
  const [phoneInput, setPhoneInput] = useState("")
  const audioRef = useRef<HTMLAudioElement>(null)

  const musicStartedRef = useRef(false)

  const formatPhone = (num: number) => {
    const s = String(num).padStart(10, "0")
    return `(${s.slice(0, 3)}) ${s.slice(3, 6)}-${s.slice(6)}`
  }

  const handleFix = () => {
    setBlurred(false)
    setWaifuMode(false)
    setFixedMode(false)
    setNumber(9173210000)
    setPhoneInput("")
  }

  const handleWaifu = () => {
    setBlurred(false)
    setWaifuMode(true)
  }

  return (
    <>
    {waifuMode ? (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#0a0a0a] px-4 overflow-hidden">
        <pre className="text-[#ff79c6] text-[4px] leading-[1.15] font-mono sm:text-[5px] md:text-[6px] lg:text-[7px] select-none whitespace-pre">{`⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣠⡤⠶⠆⠛⠛⠉⠉⣉⠉⠉⠁⠁⠉⠚⠋⠽⣯⡝⣿⢲⣦⣤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⡤⠶⠛⠉⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⠕⠋⠀⠀⠀⠀⠀⠀⠙⠪⣗⠾⣜⡽⣻⢦⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡴⠛⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⢼⡺⣥⣛⢮⠿⣦⣄⣠⡴⠚⠛⠙⠓⠛⠲⠦⣤⣀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡾⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠶⣹⣎⡟⢶⣻⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⢦⣀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⣀⣤⣤⢶⡶⣶⢶⠶⣦⣤⡴⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢮⡝⣧⢻⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢶⡀⠀⠀⠀
⠀⠀⠀⣠⣶⢿⣫⠷⣹⠮⣵⣋⢾⡹⣮⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣎⠿⣿⣶⣤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⣆⠀⠀
⠀⣠⣾⣻⣜⡳⢮⣝⣣⢟⡲⣝⢮⣳⠋⠀⠀⠢⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣟⣻⣷⢻⣿⣿⠶⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠙⣧⠀
⠀⠛⣿⡟⣧⣛⢧⡞⣱⢮⡳⣝⣺⠇⠀⠀⢀⡞⠈⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⡽⣿⡧⣏⣿⣷⡌⠙⢶⣄⠀⠀⠠⣄⡀⠀⠀⠹⡆
⠀⣼⢯⡝⡶⣹⣎⣾⡵⠿⣻⣿⡟⠀⠀⢀⡞⠀⡞⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠜⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣿⣿⡜⡶⣿⣿⣦⠀⠉⢷⣄⠀⡿⠛⠶⣄⠀⣿
⢰⣯⣳⡽⠟⠛⠉⢀⣠⣾⣻⣿⠇⠀⠀⡼⠀⡼⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠴⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠀⠀⢻⣿⡟⣼⢻⡝⣿⣷⡀⠀⠙⠿⠃⠀⠀⠈⢷⡿
⠙⠛⠁⠀⠀⢀⣴⣻⡯⢃⣾⣿⠀⠀⢰⠃⢰⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⠔⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇⠀⠀⠀⠸⣿⣿⣜⣻⡇⠈⢿⣟⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠸⡯⠏⢠⣿⡛⣿⠈⠀⠚⠠⠫⠄⢠⢀⠀⠀⠀⠀⠀⠀⠀⠀⣀⠔⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡄⠀⠀⠀⠀⠀⠀⠀⠀⡟⠀⠀⠀⠀⡿⣜⢮⣽⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠙⠷⠁⣿⠀⠀⠀⠀⠀⠀⣸⠀⠀⠀⠀⠀⣀⣤⡒⠉⠀⢸⡿⠹⣧⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣜⡇⠀⠀⠀⠀⠀⠀⠀⢠⠇⠀⠀⠀⠀⢻⡼⣳⢺⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⢸⢀⣠⠤⠒⠋⠉⢿⡟⢷⣤⣸⡇⠀⠈⠻⣦⡀⠀⠀⠀⠀⠀⢀⡴⠋⡸⠀⠀⠀⡀⠀⠀⠀⣠⠏⠀⠈⣤⡀⠀⢸⡳⣭⢻⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠀⢀⣀⡠⠤⠒⠋⠉⠀⠀⠀⠀⠀⠈⠻⣦⡀⢹⡟⠷⢶⣤⣍⣻⣦⡀⣀⠴⠚⠁⠀⡴⠁⢀⣠⠞⡗⢀⣠⠞⠁⠀⠀⠀⢸⡷⡄⢸⡳⣭⢻⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠺⢳⣟⣋⣉⠉⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣝⠿⣾⣿⠀⣀⣠⠭⠿⠛⠉⠁⠀⠀⡴⠮⣶⠚⠉⠀⣀⡗⠋⢸⠀⠀⠀⠀⠀⠘⣷⡛⣯⢳⣭⢻⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢈⣽⡯⠟⠋⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⡤⠬⠟⠿⣏⡉⠁⠀⠀⠀⠀⠀⠀⠀⡤⠖⠋⢁⡤⢒⣩⡀⠀⠀⢸⠀⠀⠀⠀⠀⠀⣷⡹⣎⠷⣎⢿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠐⠶⣻⣛⣉⣁⣀⣀⣤⣠⣤⣤⡴⣶⠒⣺⡿⠛⢛⣿⢿⣶⣤⡈⠓⠂⠀⠀⠀⠀⠀⠀⠀⠀⠖⢉⣵⣾⣿⡿⣍⠙⠻⢧⣸⠀⠀⠀⠀⠀⠀⣿⡱⢯⡝⣮⣿⠅⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⣿⠧⠿⠦⠷⠽⠮⣿⠉⠀⢰⣟⡮⣟⣼⡻⡌⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠃⣾⡽⡿⠽⣽⣃⠀⠀⢹⠀⠀⠀⠀⠀⠀⣿⡹⢮⡝⡶⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣿⣆⠀⣧⡀⠀⠀⠸⡄⠀⢸⠚⢛⠀⢘⠛⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⡉⠉⠆⠠⠋⠹⠀⠀⡾⠀⠀⠀⠀⠀⠀⣷⢏⡷⣹⢳⣿⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣦⣟⢿⣦⡀⠀⠹⡄⠀⢂⠀⠈⠀⡰⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠡⠀⠀⠀⡠⠁⠀⢀⡇⠀⠀⠀⠀⠀⢰⡟⣮⢳⣭⣻⡷⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⡼⣛⢧⣿⣽⣳⣦⣹⣄⠀⠈⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠁⠀⠀⠀⢸⠁⠀⠀⠀⠀⠀⣼⡻⣜⡳⣎⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⣷⢫⡞⣽⡀⢉⡛⡄⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡏⠀⢰⡆⠀⢀⣾⢳⡝⣎⢷⣹⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⣧⣛⢶⣳⣸⢷⣼⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡤⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡸⠁⣤⣿⣧⡶⡿⣭⢳⣽⣎⠷⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢷⣏⣶⣭⣛⠾⣴⡛⣦⡀⠀⠀⠀⠀⠀⠀⠀⠉⠀⠈⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⢣⣾⣟⡽⣭⢳⡝⣶⡿⠋⣿⣹⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣯⡿⠻⣮⣛⢶⣹⡿⢾⡵⣲⣤⣤⡀⣀⣀⠀⠀⠀⠀⠀⠀⣀⣀⣀⣠⣤⢴⣮⣿⡟⣿⣽⠻⣾⡜⣧⡿⠋⠀⠀⢻⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠁⠀⠈⠻⢷⡟⠀⠀⠙⠉⠀⠀⠀⢩⣿⡿⣿⣿⣿⢿⢻⡟⢿⣄⠀⠀⠀⠀⠉⠛⠋⠀⠀⠈⠛⠁⠀⠀⠀⠀⠈⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀��⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⡟⣿⣿⣿⣯⣼⢹⡀⠄⢹⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⣿⡋⣹⠁⣣⠟⡁⢸⣧⠈⡀⠹⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⢿⠃⢳⣯⡞⢁⠂⠤⢙⣿⣧⠀⠡⠹⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⢯⡟⢘⣈⡏⢀⠂⣌⣰⡘⣧⠹⣇⠠⢁⠹⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⣯⣿⠃⡐⣺⣁⠂⠌⢓⠒⡉⣿⡀⠹⣎⠆⣠⣽⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣧⠴⠂⣼⣴⣿⣿⣿⣷⣌⠀⣢⣴⣿⣷⣦⡻⣏⠁⠀⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠚⣿⣿⣿⣿⣿⣻⣿⣿⣷⣿⣿⣿⣿⣯⣷⣽⠗⠚⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⣿⣿⣟⡾⣽⣿⡿⣯⣿⣿⣽⣻⣷⢯⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⠿⢿⣿⣻⣼⣻⣽⣿⣻⣵⣻⣿⢞⣳⡿⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠙⣏⠉⠉⢹⡷⣿⡞⠁⠛⠋⣹⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡿⠀⠀⠀⠠⣿⡇⠀⠀⠀⣭⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⡄⠀⠀⢘⣿⡇⠀⠀⢀⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣍⠃⠋⢹⣿⡎⠉⠊⢹⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⡀⠀⢈⣿⡇⠀⠀⣾⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣧⠀⠀⣿⡇⠀⣸⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣆⡀⣼⢇⣰⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠁⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀`}</pre>
        <p className="text-center font-mono text-sm text-[#ff79c6]">
          Just Monika.
        </p>
        <p className="text-center font-mono text-xs text-[#ff79c6]/60">
          Talk to me using the chat below~
        </p>
      </main>
    ) : (
      <main
        className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-4 transition-all duration-500"
        style={{ filter: blurred ? "blur(4px)" : "none" }}
      >
        <h1 className="text-3xl font-bold text-foreground md:text-4xl">
          Please enter your phone number:
        </h1>
        {fixedMode ? (
          <div className="flex items-center gap-4">
            <input
              type="tel"
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
              placeholder="(917) 321-0000"
              className="h-12 w-64 rounded-md border border-border bg-muted px-4 text-xl tabular-nums text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={() => {}}
              className="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Submit
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-semibold tabular-nums text-foreground md:text-3xl">
              {formatPhone(number)}
            </h2>
            <button
              onClick={() => setNumber((n) => n + 1)}
              className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-2xl font-bold text-primary-foreground transition-colors hover:bg-primary/90"
              aria-label="Increment phone number"
            >
              +
            </button>
            <button
              onClick={() => setBlurred(true)}
              className="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Submit
            </button>
          </div>
        )}
      </main>
    )}
    <div className="fixed top-4 right-4 z-50">
      <SlingshotVolume
        onVolumeChange={(v) => {
          if (audioRef.current) {
            audioRef.current.volume = v
            if (!musicStartedRef.current) {
              audioRef.current.play()
              musicStartedRef.current = true
            }
          }
        }}
      />
    </div>
    <RedeemCode onFix={handleFix} onWaifu={handleWaifu} />
    <audio ref={audioRef} src="/audio/trap-queen.mp3" loop />
    <Chatbot waifuMode={waifuMode} />
  </>
  )
}
