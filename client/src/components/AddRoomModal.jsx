import React from 'react'

const AddRoomModal = () => {
  return (
    <div className="modal">
      <form className="modalInputs">
        <input placeholder="Name" name="name" />
        <input placeholder="Saying" name="saying" />
      </form>
    </div>
  )
}

export default AddRoomModal
