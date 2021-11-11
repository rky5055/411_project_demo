from flask import render_template, request, jsonify
from app import app
from app import database as db_helper

@app.route("/delete/<int:LPId>", methods=['POST'])
def delete(LPId):
    try:
        db_helper.remove_LivePlace_by_id(LPId)
        result = {'success': True, 'response': 'Removed LivePlace'}
    except:
        result = {'success': False, 'response': 'Something went wrong'}

    return jsonify(result)


@app.route("/edit/<int:LPId>", methods=['POST'])
def update(LPId):
    print(f"Successfully get EDIT request, LPId={LPId}")
    data = request.get_json()
    print(data)
    try:
        if data:
            if "LPName" in data:
                db_helper.update_LPName_entry(LPId, data["LPName"])
                result = {'success': True, 'response': 'LPName Updated'}
            if "address" in data:
                db_helper.update_address_entry(LPId, data["address"])
                result = {'success': True, 'response': 'address Updated'}
            if "price" in data:
                db_helper.update_price_entry(LPId, data["price"])
                result = {'success': True, 'response': 'price Updated'}
            if "rating" in data:
                db_helper.update_rating_entry(LPId, data["rating"])
                result = {'success': True, 'response': 'rating Updated'}
            if "leaseOption" in data:
                db_helper.update_leaseOption_entry(LPId, data["leaseOption"])
                result = {'success': True, 'response': 'leaseOption Updated'}
            if "website" in data:
                db_helper.update_website_entry(LPId, data["website"])
                result = {'success': True, 'response': 'website Updated'}
        else:
            result = {'success': True, 'response': 'Nothing Updated'}
    except:
        result = {'success': False, 'response': 'Something went wrong'}

    return jsonify(result)


@app.route("/create", methods=['POST'])
def create():
    """ recieves post requests to add new task """
    data = request.get_json()
    db_helper.insert_new_LivePlace(data['LPName'], data['address'], data['price'], data['rating'], data['leaseOption'], data['website'])
    result = {'success': True, 'response': 'Done'}
    return jsonify(result)


@app.route('/search/')
def search():
    pass

@app.route("/")
def homepage():
    """ returns rendered homepage """
    items = db_helper.fetch_LivePlace()
    return render_template("index.html", items=items)