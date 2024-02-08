import logo from "./assets/logo-nwl-experts.svg"
import { NewNoteCard } from "./components/new-note-card"
import { NoteCard } from "./components/note-card"

export function App() {
  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6">
      <img src={logo} alt="NLW Expert" />

      <form className="w-full">
        <input
          type="text"
          placeholder="Busque em suas notas..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard />
        <NoteCard
          note={{
            date: new Date(2023, 4, 1),
            content:
              "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam eaque, odit quis ipsum temporibus odio excepturi perferendis nesciunt eveniet earum exercitationem officiis ducimus accusantium aliquid reiciendis deleniti adipisci qui consectetur.",
          }}
        />
        <NoteCard note={{ date: new Date(), content: "Hellow." }} />
        <NoteCard
          note={{
            date: new Date(),
            content:
              "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
          }}
        />
      </div>
    </div>
  )
}
