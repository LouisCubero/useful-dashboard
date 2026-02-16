"use client"

import { useState, useEffect, useRef } from "react"
import { Chatbot } from "@/components/chatbot"
import { SlingshotVolume } from "@/components/slingshot-volume"
import { RedeemCode } from "@/components/redeem-code"
import { XPWindow } from "@/components/xp-window"

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
    <div className="flex min-h-screen flex-col" style={{ background: "linear-gradient(135deg, #245EDC 0%, #3A6EA5 40%, #4CA2CD 70%, #7EC8E3 100%)" }}>
      <div className="flex flex-1 items-center justify-center pb-10">
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
      <XPWindow title="Phone Number Entry.exe" className="w-[480px]" style={{ filter: blurred ? "blur(4px)" : "none" }}>
        <div className="flex flex-col items-center gap-4 p-4">
          <h1 className="text-base font-bold">
            Please enter your phone number:
          </h1>
          {fixedMode ? (
            <div className="flex items-center gap-2">
              <input
                type="tel"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                placeholder="(917) 321-0000"
                className="w-48 px-2 py-1 text-sm"
              />
              <button onClick={() => {}}>Submit</button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <p className="text-lg font-bold tabular-nums">
                {formatPhone(number)}
              </p>
              <button
                onClick={() => setNumber((n) => n + 1)}
                aria-label="Increment phone number"
              >
                +
              </button>
              <button onClick={() => setBlurred(true)}>
                Submit
              </button>
            </div>
          )}
        </div>
      </XPWindow>
    )}
      </div>
      {/* XP Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 z-[60] flex h-[30px] items-center justify-between px-1" style={{ background: "linear-gradient(180deg, #3168d5 0%, #4E8EF7 3%, #245EDC 6%, #1941A5 94%, #0D2F76 100%)" }}>
        <button className="flex h-[22px] items-center gap-1 rounded-sm px-2 font-bold text-white" style={{ background: "linear-gradient(180deg, #3B9C3F 0%, #3B9C3F 50%, #368137 100%)", fontSize: "11px" }}>
          <span style={{ fontStyle: "italic", fontWeight: 900 }}>Start</span>
        </button>
        <div className="flex h-full items-center gap-2 border-l border-l-[#0D2F76] px-2 text-white" style={{ background: "linear-gradient(180deg, #1290E9 0%, #1963CA 50%, #1963CA 100%)", fontSize: "11px" }}>
          <span>{new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</span>
        </div>
      </div>

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
    </div>
  )
}
