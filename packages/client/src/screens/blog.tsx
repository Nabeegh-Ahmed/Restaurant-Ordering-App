import { useParams } from "react-router-dom"
import { trpc } from "../trpc"
import MainLayout from "../layouts/mainLayout"

const Blog = () => {
    const { id } = useParams()
    const { data, isLoading } = trpc.getBlog.useQuery({id: id??""})
    return (<MainLayout>

        <h1 className="text-4xl mt-4 font-bold">{data?.data.blog?.title}</h1>
        <img src={data?.data.blog?.photo}  className="w-fit my-4"/>
        <div dangerouslySetInnerHTML={{__html: data?.data.blog?.content!}}></div>
    </MainLayout>)
}

export default Blog