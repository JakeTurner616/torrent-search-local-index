from flask import Flask, render_template, request
import json

app = Flask(__name__)

def read_data():
    with open('index.json', encoding='utf-8') as f:
        data = json.load(f)
    return data
@app.route("/", methods=["GET", "POST"])
def index():
    return render_template('search.html')

@app.route('/search')
def search():
    
    query = request.args.get('query')
    data = read_data()
    results = []
    for item in data:
        title = item.get('title_long')
        if title and query.lower() in title.lower():
            results.append(item)
    if not results:
        message = f"No results found for '{query}'."
    else:
        message = f"Showing results for '{query}':"
    return render_template('results.html', results=results, message=message)

if __name__ == '__main__':
    app.run(debug=True)