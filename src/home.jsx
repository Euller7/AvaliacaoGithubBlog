import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './home.css'; // Certifique-se de que o arquivo CSS está no caminho correto

const Home = () => {
    const [profile, setProfile] = useState(null);
    const [issues, setIssues] = useState([]);

    useEffect(() => {
        const username = 'Euller7';
        const repo = 'AvaliacaoGithubBlog';

        // Buscar dados do perfil
        axios.get(`https://api.github.com/users/${username}`)
            .then(response => {
                setProfile(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar perfil:', error);
            });

        // Buscar issues do repositório
        axios.get(`https://api.github.com/repos/${username}/${repo}/issues`)
            .then(response => {
                setIssues(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar issues:', error);
            });
    }, []);

    if (!profile) {
        return <div>Carregando perfil...</div>;
    }

    return (
        <div className="container">
            <div className="profile">
                <img src={profile.avatar_url} alt={profile.name} width="100" />
                <div>
                    <h1>{profile.name}</h1>
                    <p>👥 {profile.followers} seguidores 📁 {profile.public_repos} repositórios</p>
                </div>
            </div>
            <div className="issues-list">
                {issues.length > 0 ? (
                    issues.map(issue => (
                        <Link to={`/issue/${issue.number}`} key={issue.id} className="issue-card">
                            <h2>{issue.title}</h2>
                            <p>{issue.body.substring(0, 100)}...</p>
                            <span>🕒 {new Date(issue.created_at).toLocaleDateString()}</span>
                        </Link>
                    ))
                ) : (
                    <p>Nenhuma issue encontrada.</p>
                )}
            </div>
        </div>
    );
};

export default Home;
