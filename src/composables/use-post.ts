import IPost from "@/interface/posts"

export async function fetchPosts(): Promise<IPost[]> {
    const data: Array<IPost> = await fetch('api/posts').then(res => res.json())
    return data
}

export async function fetchPost(id: string): Promise<IPost> {
    const data: IPost = await fetch(`/api/posts/${id}`).then(res => res.json())
    return data
}

export async function addPost(post: IPost): Promise<IPost> {
    const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(post)
    })
    const data = await res.json()
    return data
}

export async function deletePost(id: string): Promise<boolean> {
    if (confirm('Delete post?')) {
        const res = await fetch(`/api/posts/${id}`, {
            method: 'DELETE'
        })
        return (res.status === 200)
    } else {
        return false  
    }
}

export async function updatePost(post: IPost) {
    const updPost = {
    ...post,
    title: post.title,
    author: post.author,
    date: post.date,
    content: post.content
    }
    const res = await fetch(`/api/posts/${post.id}`, {
    method: 'PUT',
    headers: {
        'Content-type': 'application/json'
    },
    body: JSON.stringify(updPost)
    })

    const data = await res.json()
    return data
}