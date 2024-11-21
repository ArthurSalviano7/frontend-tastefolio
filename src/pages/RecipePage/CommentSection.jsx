import React, { useEffect } from "react";
import { useState } from "react";
import { getUser } from "../../service/userService";
import { FaRegUserCircle } from "react-icons/fa";
import "./RecipePage.scss";

const CommentsSection = ({ comments }) => {
    const [users, setUsers] = useState({}); // Mapeia `idUser` para dados do usuário

    /* Function to adjust date: "2024-11-19T19:39:29.000Z" ===> 19/11/2024, 19:38 */
    const dateFormat = (date) =>{
        const newDate = new Date(date);
        const formatedDate = new Intl.DateTimeFormat('pt-BR', {
            dateStyle: 'short',
            timeStyle: 'short',
            timeZone: 'America/Sao_Paulo', // Fuso horário do Brasil
        }).format(newDate);

        return formatedDate;
    }
  
    /* Function to get the user information */
    const fetchUsers = async () => {
        try {
        // Obtain all Users Id's
        const uniqueUserIds = [...new Set(comments.map((comment) => comment.idUser))];

        // get user information and build userMap
        const userResponses = await Promise.all(
            uniqueUserIds.map((idUser) => getUser(idUser))
        );

        const userMap = userResponses.reduce((acc, response, index) => {
            const userData = response.data.data[0];
            acc[uniqueUserIds[index]] = userData;
            return acc;
        }, {});

        setUsers(userMap);
        } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        } 
    };

    // Carregar usuários ao montar o componente ou quando os comentários mudarem
    useEffect(() => {
        if (comments.length > 0) {
        fetchUsers();
        }
    }, [comments]);

  
    return (
        <div>
          <div>
            {comments.map((comment) => {
              const user = users[comment.idUser];
        
              return (
                <div key={comment.id} className="comment-card d-flex flex-column p-2 my-2">
                    <span className="d-flex flex-inline align-items-center justify-content-between py-1">
                        <span className="d-flex gap-3">
                            <FaRegUserCircle size={25}/>
                            {user ? user.name : "Carregando..."}
                        </span>
                        <span className="text-muted small">{dateFormat(comment.createdAt)}</span>
                    </span>
                  {user ? (
                    <p className="text-muted small">{comment.text}</p>
                  ) : (
                    <p>Carregando usuário...</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      );
    };
    
    export default CommentsSection;