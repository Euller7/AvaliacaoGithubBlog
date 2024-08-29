import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import './issueDetail.css';  // Importa o CSS

export default function IssueDetail() {
    const { issue_number } = useParams();
    const [issue, setIssue] = useState(null);

    useEffect(() => {
        axios.get(`https://api.github.com/repos/Euller7/AvaliacaoGithubBlog/issues/${issue_number}`)
            .then(response => setIssue(response.data));
    }, [issue_number]);

    return (
        <div className="issue-detail">
            {issue && (
                <>
                    <header>
                        <a href="/" className="back-link">Voltar</a>
                        <h1>{issue.title}</h1>
                        <div className="meta">
                            <span>👥 {issue.comments} comentários</span>
                            <span>🕒 {new Date(issue.created_at).toLocaleDateString()}</span>
                        </div>
                    </header>
                    <div className="issue-body">
                        <ReactMarkdown>{issue.body}</ReactMarkdown>
                    </div>
                </>
            )}
        </div>
    );
}
