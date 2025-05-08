import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const ProjectMap = dynamic(() => import('../../components/projectMap'), { ssr: false });

export default function CityProjects() {
  const { city } = useRouter().query;
  console.log(city)
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log('projects =',projects)

  useEffect(() => {
    if (!city) return;
    setLoading(true);
    fetch(`/api/projectmap?city=${city}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        let index = 0;
        const loadStep = () => {
          if (index < data.length) {
            setProjects(p => [...p, data[index++]]);
            setTimeout(loadStep, 300);
          } else {
            setLoading(false);
          }
        };
        loadStep();
      });
  }, [city]);

  return (
    <div>
      <h1>Projects in {city}</h1>
      {loading && <p>Loading...</p>}
      <ProjectMap projects={projects} />
    </div>
  );
}
