import React, { useCallback, useState } from 'react';
import { Handle, Position } from '@xyflow/react';

const handleStyle = { left: 10 };

interface Lang {
  [key: string]: string[];
}

interface Page {
  name: string;
  desc: string;
}

interface Route {
  method: 'GET' | 'POST';
  path: string;
  description: string;
}

export function TextUpdaterNode({ data, id }: { data: any; id: string }) {
  const [nodeName, setNodeName] = useState<string>(data.nodeName || '');
  const [nodeType, setNodeType] = useState<string>(data.nodeType || '');
  const [nodeLang, setLang] = useState<string>(data.nodeLang || '');
  const [pageInput, setPageInput] = useState<string>('');
  const [clientPages, setClientPages] = useState<Page[]>(data.clientPages || []);
  const [serverRoutes, setServerRoutes] = useState<Route[]>(data.serverRoutes || []);
  const [routeInput, setRouteInput] = useState<{ method: 'GET' | 'POST'; path: string; description: string }>({
    method: 'GET',
    path: '',
    description: '',
  });

  const languages: Lang = {
    server: ['node.js (express)', 'python (django)', 'go (fiber)', 'go (gin)', 'c++'],
    client: ['react.js (javascript)', 'react.js (typescript)', 'vue.js'],
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNodeType(event.target.value);
    data.onChange(id, { nodeType: event.target.value });
  };

  const handleLangChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLang(event.target.value);
    data.onChange(id, { nodeLang: event.target.value });
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNodeName(event.target.value);
    data.onChange(id, { nodeName: event.target.value });
  };

  const handlePageKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && pageInput) {
      const newPages = [...clientPages, { name: pageInput, desc: '' }];
      setClientPages(newPages);
      setPageInput('');
      data.onChange(id, { clientPages: newPages });
    }
  };

  const handleRouteAdd = () => {
    if (routeInput.path) {
      const newRoutes = [...serverRoutes, routeInput];
      setServerRoutes(newRoutes);
      setRouteInput({ method: 'GET', path: '', description: '' });
      data.onChange(id, { serverRoutes: newRoutes });
    }
  };

  const handleUpDesc = (new_desc: string, index: number) => {
    const updatedPages = clientPages.map((page, i) => (i === index ? { ...page, desc: new_desc } : page));
    setClientPages(updatedPages);
    data.onChange(id, { clientPages: updatedPages });
  };

  return (
    <div className="bg-white p-4 text-black">
      <Handle type="target" position={Position.Top} />
      <div>
        <input
          id="text"
          name="text"
          placeholder="node name..."
          onChange={handleNameChange}
          value={nodeName}
          className="nodrag p-2 border-b-2 border-black w-full"
        />
        {nodeName && (
          <div>
            <div>
              <select value={nodeType} onChange={handleChange} className="w-full p-2 mt-2">
                <option value="" disabled>
                  Select node type
                </option>
                <option value="server">Web Server</option>
                <option value="client">Web Client</option>
              </select>
            </div>

            {nodeType && (
              <select value={nodeLang} onChange={handleLangChange} className="w-full p-2 mt-2">
                <option value="">Select language</option>
                {languages[nodeType].map((lang, index) => (
                  <option key={index} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            )}

            {nodeLang && (
              <div className="mt-4">
                <div>{nodeType === 'server' ? 'Endpoints:' : 'Pages:'}</div>
                {nodeType === 'client' && (
                  <input
                    id="pageInput"
                    name="pageInput"
                    placeholder="Add page..."
                    onChange={(e) => setPageInput(e.target.value)}
                    onKeyDown={handlePageKeyPress}
                    value={pageInput}
                    className="nodrag p-2 border-b-2 border-black w-full mt-2"
                  />
                )}
                {nodeType === 'server' && (
                  <div className="mt-2">
                    <select
                      value={routeInput.method}
                      onChange={(e) => setRouteInput({ ...routeInput, method: e.target.value as 'GET' | 'POST' })}
                      className="p-2 mr-2"
                    >
                      <option value="GET">GET</option>
                      <option value="POST">POST</option>
                    </select>
                    <input
                      placeholder="Path"
                      value={routeInput.path}
                      onChange={(e) => setRouteInput({ ...routeInput, path: e.target.value })}
                      className="p-2 mr-2"
                    />
                    <input
                      placeholder="Description"
                      value={routeInput.description}
                      onChange={(e) => setRouteInput({ ...routeInput, description: e.target.value })}
                      className="p-2 mr-2"
                    />
                    <button onClick={handleRouteAdd} className="bg-blue-500 text-white p-2 rounded">
                      Add Route
                    </button>
                  </div>
                )}
                {nodeType === 'client'
                  ? clientPages.map((page, index) => (
                      <div key={index} className="mt-2 border-l-2 border-black p-2">
                        <div>{page.name}</div>
                        <textarea
                          className="text-black bg-gray-200 w-full mt-1 p-2"
                          rows={3}
                          value={page.desc}
                          onChange={(e) => handleUpDesc(e.target.value, index)}
                        ></textarea>
                      </div>
                    ))
                  : serverRoutes.map((route, index) => (
                      <div key={index} className="mt-2 border-l-2 border-black p-2">
                        <div>
                          {route.method} {route.path}
                        </div>
                        <div className="text-sm text-gray-600">{route.description}</div>
                      </div>
                    ))}
              </div>
            )}
          </div>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle type="source" position={Position.Bottom} id="b" style={handleStyle} />
    </div>
  );
}