import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const notesData = [
  { id: 1, title: "First Note", author: "John Doe", description: "This is the first note." },
  { id: 2, title: "Second Note", author: "Jane Smith", description: "This is the second note with more details." },
];

export default function Project() {
  const [selectedNote, setSelectedNote] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Your Notes</h1>
        <Button>Add Note</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {notesData.map((note) => (
          <Card key={note.id} className="cursor-pointer" onClick={() => {
              setSelectedNote(note);
              setIsOpen(true);
            }}>
            <CardContent className="p-4">
              <h2 className="text-lg font-bold">{note.title}</h2>
              <p className="text-sm text-gray-500">By {note.author}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedNote?.title}</DialogTitle>
          </DialogHeader>
          <p><strong>Author:</strong> {selectedNote?.author}</p>
          <p>{selectedNote?.description}</p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
