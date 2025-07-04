import React, { useEffect, useState } from 'react'
import supabase from "../../utils/sup-config/supabaseConfig";

const CharactersList = () => {
  const [characters, setCharacters] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('stores')
          .select()

        if (error) throw error

        setCharacters(data)
      } catch (err) {
        console.error('Error al obtener personajes:', err.message)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCharacters()
  }, [])

  if (loading) return <p>Cargando personajes...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <ul>
      {characters.map((char) => (
        <li key={char.id}>{char.store_name}</li>
      ))}
    </ul>
  )
}

export default CharactersList
